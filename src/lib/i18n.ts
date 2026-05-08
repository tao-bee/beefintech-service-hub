export const locales = ["zh-CN", "zh-HK", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh-HK";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type ContactDemoDictionary = {
  sectionTitle: string;
  contact: {
    title: string;
    description: string;
    wechatLabel: string;
    wechatTitle: string;
    wechatDescription: string;
    phoneLabel: string;
    phoneTitle: string;
    phoneDescription: string;
    phoneNumber: string;
    qrPlaceholder: string;
  };
  demo: {
    title: string;
    description: string;
    submitLabel: string;
    submittingLabel: string;
    successMessage: string;
    fallbackErrorMessage: string;
    fields: {
      salutation: {
        label: string;
        placeholder: string;
      };
      company: {
        label: string;
        placeholder: string;
      };
      contact: {
        label: string;
        placeholder: string;
      };
      enquiry: {
        label: string;
        placeholder: string;
      };
    };
    errors: {
      contactRequired: string;
    };
  };
};

const contactDemoDictionaries: Record<Locale, ContactDemoDictionary> = {
  "zh-HK": {
    sectionTitle: "聯絡與示範預約",
    contact: {
      title: "聯絡我們",
      description:
        "如需了解產品功能、合作方式或安排 Demo，可透過以下方式與我們聯絡。",
      wechatLabel: "微信聯絡",
      wechatTitle: "微信聯絡",
      wechatDescription: "二維碼將稍後補上，現階段可先透過電話與我們聯絡。",
      phoneLabel: "電話聯絡",
      phoneTitle: "電話聯絡",
      phoneDescription: "如需直接溝通合作安排或 Demo，可致電與我們聯絡。",
      phoneNumber: "55751661",
      qrPlaceholder: "微信二維碼將稍後補上",
    },
    demo: {
      title: "預約 Demo",
      description: "留下聯絡資料及想了解的內容，我們會安排後續跟進。",
      submitLabel: "提交",
      submittingLabel: "提交中...",
      successMessage: "資料已提交，我們會盡快與你跟進。",
      fallbackErrorMessage: "提交失敗，請稍後再試。",
      fields: {
        salutation: {
          label: "稱呼",
          placeholder: "請輸入稱呼",
        },
        company: {
          label: "公司名稱",
          placeholder: "請輸入公司名稱",
        },
        contact: {
          label: "聯絡方式",
          placeholder: "電話 / WhatsApp / 微信號 / 電郵",
        },
        enquiry: {
          label: "查詢內容",
          placeholder: "請輸入想了解的內容",
        },
      },
      errors: {
        contactRequired: "請填寫聯絡方式",
      },
    },
  },
  "zh-CN": {
    sectionTitle: "联系与演示预约",
    contact: {
      title: "联系我们",
      description:
        "如需了解产品功能、合作安排或预约 Demo，可通过以下方式与我们联系。",
      wechatLabel: "微信联系",
      wechatTitle: "微信联系",
      wechatDescription: "二维码将稍后补上，现阶段可先通过电话与我们联系。",
      phoneLabel: "电话联系",
      phoneTitle: "电话联系",
      phoneDescription: "如需直接沟通合作安排或 Demo，可致电与我们联系。",
      phoneNumber: "55751661",
      qrPlaceholder: "微信二维码将稍后补上",
    },
    demo: {
      title: "预约 Demo",
      description: "留下联系方式及想了解的内容，我们会安排后续跟进。",
      submitLabel: "提交",
      submittingLabel: "提交中...",
      successMessage: "资料已提交，我们会尽快与您跟进。",
      fallbackErrorMessage: "提交失败，请稍后再试。",
      fields: {
        salutation: {
          label: "称呼",
          placeholder: "请输入称呼",
        },
        company: {
          label: "公司名称",
          placeholder: "请输入公司名称",
        },
        contact: {
          label: "联系方式",
          placeholder: "电话 / WhatsApp / 微信号 / 邮箱",
        },
        enquiry: {
          label: "咨询内容",
          placeholder: "请输入想了解的内容",
        },
      },
      errors: {
        contactRequired: "请填写联系方式",
      },
    },
  },
  en: {
    sectionTitle: "Contact & Demo Request",
    contact: {
      title: "Contact Us",
      description:
        "If you would like to learn more about our product capabilities, partnership arrangements or request a demo, you can reach us through the following channels.",
      wechatLabel: "WeChat",
      wechatTitle: "WeChat",
      wechatDescription: "The QR code will be added later. For now, please contact us by phone.",
      phoneLabel: "Phone",
      phoneTitle: "Phone",
      phoneDescription: "Call us directly for partnership enquiries or demo arrangements.",
      phoneNumber: "55751661",
      qrPlaceholder: "WeChat QR code will be added later",
    },
    demo: {
      title: "Request a Demo",
      description:
        "Leave your contact details and what you would like to know, and our team will follow up with you.",
      submitLabel: "Submit",
      submittingLabel: "Submitting...",
      successMessage: "Your details have been submitted. Our team will follow up with you.",
      fallbackErrorMessage: "Submission failed. Please try again later.",
      fields: {
        salutation: {
          label: "Name",
          placeholder: "Enter your name",
        },
        company: {
          label: "Company Name",
          placeholder: "Enter your company name",
        },
        contact: {
          label: "Contact Details",
          placeholder: "Phone / WhatsApp / WeChat ID / Email",
        },
        enquiry: {
          label: "Enquiry",
          placeholder: "Tell us what you would like to know",
        },
      },
      errors: {
        contactRequired: "Please enter your contact details",
      },
    },
  },
};

export function getContactDemoDictionary(locale: Locale) {
  return contactDemoDictionaries[locale];
}
