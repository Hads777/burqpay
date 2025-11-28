import { useEffect, useState } from "react";
import { Button, DatePicker, Dropdown, Menu, Select } from "antd";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";
import arrowDown from "../../assets/images/arrow-down.png";

const { Option } = Select;

const dummyRoles = Array.from({ length: 93 }).map((_, index) => {
  const id = index + 1;
  const isMerchant = id % 2 === 0;
  return {
    id,
    name: isMerchant ? "Merchant" : "User",
    permissions: "Ledger/Customers/Reports",
  };
});

const Role = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows] = useState(dummyRoles.length);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(Math.min(pageSize, totalRows));
  const [totalPage, setTotalPage] = useState(
    Math.ceil(dummyRoles.length / pageSize)
  );
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    setSkelitonLoading(true);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setTableData(dummyRoles.slice(start, end));
    setFrom(start + 1);
    setTo(Math.min(end, totalRows));
    setTotalPage(Math.ceil(totalRows / pageSize));
    setSkelitonLoading(false);
  }, [page, pageSize, totalRows]);

  const handleMenuClick = (key: string, row: any) => {
    console.log("Role action:", key, row);
  };

  const menuItems = [
    {
      key: "edit",
      label: "Edit",
    },
    {
      key: "delete",
      label: "Delete",
    },
  ];

  const menu = (row: any) => (
    <Menu onClick={({ key }) => handleMenuClick(key, row)} items={menuItems} />
  );

  const Activity_Loans_Header = [
    {
      name: "",
      width: "60px",
      cell: () => <input type="checkbox" />,
    },
    {
      name: "Name",
      selector: (row: { name: any }) => row.name,
      sortable: true,
    },
    {
      name: "Permissions",
      selector: (row: { permissions: any }) => row.permissions,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: any) => (
        <Dropdown overlay={menu(row)} trigger={["click"]}>
          <Button
            className="gradient-btn"
            type="primary"
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              borderColor: "white",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            Select <img src={arrowDown} alt="" />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="service">
      <div className="d-flex justify-content-end align-items-center mb-3">
        {/* <h4 className="mb-0 fw-bold">Roles</h4> */}
        <Button
          type="primary"
          style={{
            backgroundColor: "#C91E14",
            borderColor: "#C91E14",
            borderRadius: "6px",
            padding: "8px 24px",
          }}
        >
          Add New Role
        </Button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-2 border px-3 search-box w-100">
            <img src={Images.searchIconGray} alt="" />
            <input
              type="text"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
              }}
              className="p-2 w-100"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <DatePicker placeholder="From" />
          <DatePicker placeholder="To" />
          <Select
            placeholder="Filters"
            style={{ minWidth: 130 }}
            suffixIcon={<FaFilter />}
          >
            <Option value="all">All</Option>
            <Option value="user">User</Option>
            <Option value="merchant">Merchant</Option>
          </Select>
        </div>
      </div>

      <TableView
        header={Activity_Loans_Header}
        data={tableData}
        totalRows={totalRows}
        isLoading={skelitonLoading}
        from={from}
        page={page}
        pageSize={pageSize}
        totalPage={totalPage}
        setPage={setPage}
        setPageSize={setPageSize}
        to={to}
      />
    </div>
  );
};

export default Role;

