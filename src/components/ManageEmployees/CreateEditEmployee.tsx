import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const CreateEditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState<any>(null);

  const isEdit = location.pathname.toLowerCase().includes("/edit/");

  useEffect(() => {
    // Fetch employee details when in edit mode
    if (isEdit && id) {
      setLoading(true);
      // TODO: Replace with actual API call
      // Example: fetchEmployee(id).then(data => setEmployeeData(data))
      
      // Simulating API call with timeout
      setTimeout(() => {
        // Mock data - replace with actual API response
        setEmployeeData({
          id: id,
          name: "Muhammad Ali",
          email: "mali@email.com",
          phone: "501236666",
          department: "it",
          role: "admin",
          status: "active",
          permissions: {
            disbursement: true,
            "beneficiary.create": false,
            "beneficiary.list": false,
            "disbursement.ibft.ledger": false,
            "disbursement.bulk.transaction": false,
            "beneficiary.delete": true,
            "beneficiary.bulk.import": true,
            "disbursement.instant.transfer": true,
          },
        });
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [id, isEdit]);

  const handleSubmit = (data: any) => {
    setLoading(true);
    
    if (isEdit && id) {
      // TODO: Replace with actual API call
      // Example: updateEmployee(id, data).then(() => { ... })
      
      // Simulating API call
      setTimeout(() => {
        toast.success("Employee updated successfully");
        setLoading(false);
        navigate("/ManageEmployees/AllEmployees");
      }, 500);
    } else {
      // TODO: Replace with actual API call
      // Example: createEmployee(data).then(() => { ... })
      
      // Simulating API call
      setTimeout(() => {
        toast.success("Employee created successfully");
        setLoading(false);
        navigate("/ManageEmployees/AllEmployees");
      }, 500);
    }
  };

  const handleCancel = () => {
    navigate("/ManageEmployees/AllEmployees");
  };

  if (loading && isEdit && !employeeData) {
    return <Loader />;
  }

  return (
    <div className="service customer-list-page">
      {loading && <Loader />}
      <EmployeeForm
        mode={isEdit ? "edit" : "create"}
        initialData={employeeData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CreateEditEmployee;


