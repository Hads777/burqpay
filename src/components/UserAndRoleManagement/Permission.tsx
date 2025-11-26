import { useEffect, useState } from "react";

import { Select, Checkbox } from "antd";
import {
  getPermissionList,
  getPermissionListByRole,
  getRole,
  updatePermission,
} from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

const Permission = () => {
  const [status, setStatus] = useState<any>();
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [selectName, setSelectedName] = useState("");
  const [permissionData, setPermissionData] = useState<any>([]);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState([]);

  const getAllRole = async () => {
    setSkelitonLoading(true);
    try {
      const res = await getRole("", "");
      if (res) {
        if (res?.data?.success) {
          const data = res.data.data;
          console.log(data, "status");
          setStatus(data || []);
          setSkelitonLoading(false);
        }
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      setSkelitonLoading(false);
    }
  };
  const handleModuleChange = (module, checked) => {
    const permIds = module?.permissions?.map((perm) => perm.id) || [];
    if (checked) {
      setSelectedPermissionIds((prev) => [...new Set([...prev, ...permIds])]);
    } else {
      setSelectedPermissionIds((prev) =>
        prev.filter((id) => !permIds.includes(id))
      );
    }
  };

  const handlePermissionChange = (permId, checked) => {
    if (checked) {
      setSelectedPermissionIds((prev) => [...new Set([...prev, permId])]);
    } else {
      setSelectedPermissionIds((prev) => prev.filter((id) => id !== permId));
    }
  };
  const getPermission = async () => {
    setSkelitonLoading(true);
    try {
      const res = await getPermissionList();
      if (res) {
        if (res?.data?.success) {
          setSkelitonLoading(false);
          const data = res.data.data;
          setPermissionData(data[0]);
        }
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      setSkelitonLoading(false);
    }
  };
  const getPermissionRole = async (id) => {
    setSkelitonLoading(true);
    try {
      const res = await getPermissionListByRole(id);
      if (res?.data?.success) {
        const data = res.data.data[0];
        console.log(data, "datadatadata");
        const permissionIds = data?.modules?.flatMap((module) =>
          module.permissions.map((permission) => permission.id)
        );
        console.log(permissionIds, "permissionIdspermissionIds");
        setSelectedPermissionIds(permissionIds);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    } finally {
      setSkelitonLoading(false);
    }
  };

  const handleStatusChange = (selectedId) => {
    const selectedItem = status.find(
      (item) => item.id === parseInt(selectedId)
    );
    getPermissionRole(selectedId);
    if (selectedItem) {
      setSelectedName(selectedItem.id);
    }
  };
  useEffect(() => {
    getAllRole();
    getPermission();
  }, []);
  const handleSubmit = async () => {
    if (selectName === "") {
      toast.error("Please Select Role");
      return null;
    }
    const body = {
      role: selectName,
      permission: selectedPermissionIds,
    };

    try {
      const res = await updatePermission(body);
      if (res.data.message) {
        toast.success(res.data.message);
        getAllRole();
      }
    } catch (error) {
      console.error("Failed to submit", error);
    }
  };
  function formatLabel(text: string): string {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return (
    <div className="service ps-3">
      {skelitonLoading && <Loader />}
      <div className="custom-mod">
        <div className="cust-drop col-4">
          <label>Role Name</label>
          <Select
            className="remove-bg"
            style={{ width: "100%", marginTop: "10px", background: "#fff" }}
            onChange={handleStatusChange}
            placeholder="Select role"
          >
            {status &&
              status.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Select>
          <p className="edit-mod">Edit modal content</p>
        </div>
      </div>
      <div className="service">
        <div className="theme-heading">Assign Permission to the Role</div>
        <div className="mt-4">
          <div className="d-flex flex-wrap">
          {permissionData?.modules?.map((module, moduleIndex) => (
  <div
    key={moduleIndex}
    className="d-flex justify-content-between align-items-center pe-2 pb-3 col-4"
  >
    <div
      className="profile-sec w-100"
      style={{ height: "-webkit-fill-available" }}
    >
      <p className="role-label">
        <Checkbox
          checked={module.permissions.every((perm) =>
            selectedPermissionIds.includes(perm.id)
          )}
          onChange={(e) =>
            handleModuleChange(module, e.target.checked)
          }
        >
          {formatLabel(module?.name)}
        </Checkbox>
      </p>
      <div className="ps-4">
        {module?.permissions?.map((perm, permIndex) => (
          <div className="mt-2" key={permIndex}>
            <Checkbox
              checked={selectedPermissionIds.includes(perm.id)}
              onChange={(e) =>
                handlePermissionChange(perm.id, e.target.checked)
              }
            >
              {formatLabel(perm?.name)}
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  </div>
))}

          </div>
        </div>
      </div>
      <div className="d-flex gap-2 justify-content-end pt-2 pb-4">
        <button className="invoice-btn">Close</button>
        <button className="theme-btn" onClick={handleSubmit}>
          Add Permission
        </button>
      </div>
    </div>
  );
};

export default Permission;
