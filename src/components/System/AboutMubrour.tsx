import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createContent } from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import { useState } from "react";

const AboutMubrour = () => {
  const [termsData, setTermsData] = useState("");
  const [termsDataAr, setTermsDataAR] = useState("");
  const handleSubmit = async () => {
    const body = {
      type: "mabrour",
      content_en: termsData,
      content_ar: termsDataAr,
    };

    try {
      const res = await createContent(body);
      if (res.data.message) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Failed to submit", error);
    }
  };
  return (
    <div className="service">
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="header-label mt-2 mb-4">About Mabruor</div>
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
                data="<p> <h1>About Mabruor</h1>Lorem ipsum magna vel sit massa lobortis faucibus dui sed tellus enim tellus vehicula eget orci quis tellus netus egestas blandit pretium tellus ut in elementum in porta nisi urna id sit laoreet nulla id facilisis nec tortor euismod bibendum adipiscing condimentum elementum hendrerit in libero porttitor eget odio tempus risus mauris sed lectus convallis ornare arcu suspendisse risus dignissim quam nec orci tincidunt bibendum sagittis lacus aliquam consequat massa neque bibendum phasellus.</p>"
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
                data="<p> <h1>عن مبرور</h1><p>لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي."
              />
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-end pt-2 pb-4">
          <button className="theme-btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutMubrour;
