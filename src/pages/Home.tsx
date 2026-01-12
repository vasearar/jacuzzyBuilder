import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

const Home: React.FC = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "common" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS not configured");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          telephone: formData.telephone,
          message: formData.message,
        },
        publicKey
      );

      setSubmitStatus({
        type: "success",
        message: t("contact_form.success"),
      });
      setFormData({ name: "", email: "", telephone: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: t("contact_form.error"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* PDF Viewer Section */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-6 text-center">
            {t("catalog_title")}
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Download link for better mobile experience */}
            <div className="p-4 text-center border-b bg-gray-50">
              <a
                href="/data/Catalog_2026_Nordstern.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#202020] text-white rounded-lg hover:opacity-90 transition-opacity text-sm md:text-base"
              >
                {t("catalog_download")}
              </a>
              <p className="mt-2 text-xs md:text-sm text-gray-600">
                {t("catalog_mobile_hint")}
              </p>
            </div>
            {/* Responsive PDF viewer */}
            <div className="pdf-viewer-container w-full bg-gray-100 rounded-b-lg">
              {/* Mobile - use object tag with FitH for iOS Safari */}
              <object
                data="/data/Catalog_2026_Nordstern.pdf#toolbar=1&view=FitH"
                type="application/pdf"
                className="w-full border-0 md:hidden"
                style={{
                  height: "500px",
                  minHeight: "500px",
                  display: "block"
                }}
                aria-label={t("catalog_title")}
              >
                <p className="p-4 text-center text-gray-600">
                  {t("catalog_load_error")}
                  <a
                    href="/data/Catalog_2026_Nordstern.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline ml-2"
                  >
                    {t("catalog_download")}
                  </a>
                </p>
              </object>
              {/* Desktop - use iframe with original height */}
              <iframe
                src="/data/Catalog_2026_Nordstern.pdf#toolbar=1"
                className="hidden md:block w-full border-0 h-[600px] lg:h-[800px]"
                title={t("catalog_title")}
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-medium mb-6 text-center">
            {t("contact_us_title")}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("contact_form.name")} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202020] focus:border-transparent"
                placeholder={t("contact_form.name_placeholder")}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("contact_form.email")} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202020] focus:border-transparent"
                placeholder={t("contact_form.email_placeholder")}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="telephone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("contact_form.telephone")} *
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                required
                value={formData.telephone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202020] focus:border-transparent"
                placeholder={t("contact_form.telephone_placeholder")}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("contact_form.message")} *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202020] focus:border-transparent resize-none"
                placeholder={t("contact_form.message_placeholder")}
              />
            </div>

            {submitStatus.type && (
              <div
                className={`mb-4 p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#202020] text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isSubmitting ? t("contact_form.sending") : t("contact_form.send")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
