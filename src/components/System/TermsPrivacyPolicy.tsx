import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createContent, getContent } from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const TermsPrivacyPolicy = () => {
  const [termsData, setTermsData] = useState("");
  const [termsDataAr, setTermsDataAR] = useState("");
  const [privacyEn, setPrivacyEn] = useState("");
  const [privacyAr, setPrivacyAr] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    const body = {
      type: "terms_and_conditions",
      content_en: termsData,
      content_ar: termsDataAr,
    };
    setIsLoading(true);
    try {
      const res = await createContent(body);
      if (res.data.message) {
        toast.success(res.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to submit", error);
    }
  };
  const handleSubmitPrivacy = async () => {
    const body = {
      type: "privacy_policy",
      content_en: privacyEn,
      content_ar: privacyAr,
    };
    setIsLoading(true);
    try {
      const res = await createContent(body);
      if (res.data.message) {
        toast.success(res.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to submit", error);
    }
  };
  const getContentPages = async (type: any) => {
    try {
      setIsLoading(true);
      const res = await getContent(type);
      if (res.data.message) {
        const data = res?.data?.data;

        const privacyContent = data.find(
          (item: any) => item.type === "privacy_policy"
        );
        if (privacyContent) {
          setPrivacyEn(privacyContent.content_en);
          setPrivacyAr(privacyContent.content_ar);
        }

        const termsContent = data.find(
          (item: any) => item.type === "terms_and_conditions"
        );
        if (termsContent) {
          setTermsData(termsContent.content_en);
          setTermsDataAR(termsContent.content_ar);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch content", error);
    }
  };
  useEffect(() => {
    getContentPages("privacy_policy");
    getContentPages("terms_and_conditions");
  }, []);
  return (
    <div className="service">
      {isloading && <Loader />}
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="header-label mt-2 mb-4">Terms & Conditions</div>
          <div className="col-md-6">
            <div>
              <CKEditor
                // @ts-ignore
                editor={ClassicEditor}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",

                    "bulletedList",
                    "numberedList",
                    "|",

                    "undo",
                    "redo",
                  ],
                }}
                data={termsData || ""}
                onChange={(event, editor) => setTermsData(editor.getData())}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div>
              <CKEditor
                // @ts-ignore

                editor={ClassicEditor}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",

                    "bulletedList",
                    "numberedList",
                    "|",

                    "undo",
                    "redo",
                  ],
                }}
                data={termsDataAr || ""}
                onChange={(event, editor) => setTermsDataAR(editor.getData())}
              />
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-end pt-2 pb-4">
            <button className="theme-btn" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
        <div className="row mt-4">
          <div className="header-label mt-2 mb-4">Privacy Policy</div>
          <div className="col-md-6">
            <div>
              <CKEditor
                // @ts-ignore
                editor={ClassicEditor}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",

                    "bulletedList",
                    "numberedList",
                    "|",

                    "undo",
                    "redo",
                  ],
                }}
                data={privacyEn || ""}
                onChange={(event, editor) => setPrivacyEn(editor.getData())}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <CKEditor
                // @ts-ignore
                editor={ClassicEditor}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",

                    "bulletedList",
                    "numberedList",
                    "|",

                    "undo",
                    "redo",
                  ],
                }}
                data={privacyAr || ""}
                onChange={(event, editor) => setPrivacyAr(editor.getData())}
              />
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-end pt-2 pb-4">
          <button className="theme-btn" onClick={handleSubmitPrivacy}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsPrivacyPolicy;
