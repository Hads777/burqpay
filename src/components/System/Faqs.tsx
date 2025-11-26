import { Images } from "../Config/Images";
import {
  Button,
  Dropdown,
  Menu,
  Select,
  Tabs,
  Modal,
  Input,
  Form,
  Switch,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getFaqs, addFaq, updateFaq, deleteFaqs } from "../../redux/apis/apisCrud";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const Faqs = () => {
  const [formValues, setFormValues] = useState({
    question: "",
    answer: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [deteleId, setDeteleId] = useState<any>("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const permissionData = useSelector((state: RootState) => state.block.permissions);
    const hasAccess = (moduleName: string, permissionName?: string): boolean => {
      if (!permissionData || !permissionData.modules) return false;
    
      const module = permissionData.modules.find((m) => m.name === moduleName);
      if (!module) return false;
    
      if (!permissionName) return true;
    
      return (module.permissions || []).some((p) => p.name === permissionName);
    };
  const getAllFaqs = async () => {
    setSkelitonLoading(true);
    try {
      const res = await getFaqs();
      if (res?.data?.success) {
        setData(res.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setSkelitonLoading(false);
    }
  };

  useEffect(() => {
    getAllFaqs();
  }, []);

  const handleSave = async () => {
    const { question, answer } = formValues;
    const newErrors: Record<string, string> = {};

    if (!question.trim()) newErrors.question = "Question is required";
    if (!answer.trim()) newErrors.answer = "Answer is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      setSkelitonLoading(true);
      if (editId) {
        // Edit existing FAQ
        const res = await updateFaq(editId, formValues);
        if (res?.data?.success) {
          setSkelitonLoading(false);
          message.success("FAQ updated successfully");
        }
      } else {
        // Add new FAQ

        const res = await addFaq(formValues);
        setSkelitonLoading(false);
        if (res?.data?.success) {
          message.success("FAQ added successfully");
        }
      }

      // Reset form and state
      setFormValues({ question: "", answer: "" });
      setErrors({});
      setEditId(null);
      getAllFaqs();

    } catch (error) {
      setSkelitonLoading(false);
      console.error("Error saving FAQ:", error);
      message.error("Something went wrong");
    }
  };

  const handleEdit = (faq: any) => {
    setFormValues({ question: faq.question, answer: faq.answer });
    setEditId(faq.id);
    setErrors({});
  };

  const handleDelete = async () => {
    try {
      const res = await deleteFaqs(deteleId);
      if (res?.data?.success) {
        message.success("FAQ deleted successfully");
        getAllFaqs();
        setIsDeleteModalVisible(false)
      }
    } catch (error) {
      setIsDeleteModalVisible(false)
      console.error("Error deleting FAQ:", error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="service">
      {skelitonLoading && <Loader />}
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="header-label mt-2 mb-4">FAQ’s</div>
          <div className="Ente-details col-7">
            <Form layout="vertical">
              <Form.Item>
                <div className="custom-input-container">
                  <label className="input-label">Question</label>
                  <Input
                    placeholder="Enter Question"
                    value={formValues.question}
                    onChange={(e) =>
                      setFormValues({ ...formValues, question: e.target.value })
                    }
                  />
                  {errors.question && (
                    <div className="text-danger mt-1">{errors.question}</div>
                  )}
                </div>
              </Form.Item>

              <Form.Item className="border-bottom">
                <div className="custom-input-container ">
                  <label className="input-label">Answer</label>
                  <TextArea
                    placeholder="Enter Answer"
                    value={formValues.answer}
                    onChange={(e) =>
                      setFormValues({ ...formValues, answer: e.target.value })
                    }
                  />
                  {errors.answer && (
                    <div className="text-danger mt-1">{errors.answer}</div>
                  )}
                </div>
              </Form.Item>

              <div className="d-flex justify-content-end mt-4">
                <button
                  type="button"
                  className="invoice-btn"
                  onClick={() => {
                    setFormValues({ question: "", answer: "" });
                    setErrors({});
                    setEditId(null);
                  }}
                >
                  Cancel
                </button>
                {
                   hasAccess("faq_module","store_faq")&& !editId &&
                
                <button
                  type="button"
                  className="theme-btn ms-2"
                  onClick={handleSave}
                >
                  {"Save"}
                </button>
}
{
                   hasAccess("faq_module","update_faq")&& editId &&
                
                <button
                  type="button"
                  className="theme-btn ms-2"
                  onClick={handleSave}
                >
                  {"Update"}
                </button>
}
              </div>
            </Form>
          </div>
        </div>

        <div className="header-label mt-2 mb-4">Saved FAQ’s</div>
        <div className="col-12 mt-3">
          {data.map((faq, index) => (
            <div
              key={faq.id}
              className="col-6 mt-2 d-flex faqs-question align-items-center"
            >
              <span className="col-10">
                {index + 1}. {faq.question}
              </span>
              <span
                className="col-1 d-flex align-items-center justify-content-end"
                onClick={() => handleEdit(faq)}
                style={{ cursor: "pointer" }}
              >
                <img src={Images.edit} alt="Edit" />
              </span>
              <span
                className="col-1 d-flex align-items-center justify-content-end"
                onClick={() => {setDeteleId(faq?.id);setIsDeleteModalVisible(true)}}
                style={{ cursor: "pointer" }}
              >
               {  hasAccess("faq_module","delete_faq")&&
                <img src={Images.cross} alt="Delete" />
               }
              </span>
            </div>
          ))}
        </div>
      </div>
          <Modal
              className="custom-mod center-footer"
              style={{ maxWidth: "378px" }}
              visible={isDeleteModalVisible}
              onCancel={() => setIsDeleteModalVisible(false)}
              footer={[
                <Button
                  key="no"
                  onClick={() => setIsDeleteModalVisible(false)}
                  style={{
                    border: "1px solid #ccc",
                    color: "black",
                    background: "white",
                    borderRadius: "8px",
                    padding: "4px 20px",
                    fontWeight: "500",
                  }}
                >
                  No
                </Button>,
                <Button
                  key="yes"
                  onClick={handleDelete}
                  disabled={skelitonLoading}
                  style={{
                    background: "black",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "4px 20px",
                    fontWeight: "500",
                  }}
                >
                  Yes
                </Button>,
              ]}
              centered
              closable={false}
            >
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "0",
                  }}
                >
                  Are you sure you want to delete this faq?
                </p>
              </div>
            </Modal>
    </div>
  );
};

export default Faqs;
