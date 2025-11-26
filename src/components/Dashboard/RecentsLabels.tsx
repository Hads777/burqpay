import { useEffect, useState } from "react";
import TableView from "../TableView/TableView";
import { getDashboardTableData } from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";

const RecentsLabels = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const Activity_Loans_Header = [
    {
      name: "Sr:",
      sortable: true,
      cell: (row: any) => row.index,
      width: "180px",
    },
    {
      name: "Customer ID",
      selector: (row: { customer_id: any }) => row.customer_id,
      sortable: true,
      width: "200px",
    },
    {
      name: "Customer Type",
      selector: (row: { customer_type_name: any }) => row.customer_type_name,
      sortable: true,
      width: "200px",
    },

    {
      name: "Email",
      selector: (row: { email: any }) => row.email,
      width: "200px",
      sortable: true,
    },
    {
      name: "Mobile No.",
      selector: (row: { mobile_no: any }) => row.mobile_no,
      width: "200px",
      sortable: true,
    },
    {
      name: "Register Date",
      selector: (row: { created_at: any }) => row.created_at,
      sortable: true,
      width: "240px",
    },

    {
      name: "Status",
     
      cell: (row: any) => (
        <div
          style={{
            padding: "0.22rem 1rem",
            borderRadius: "12px",
            whiteSpace:"nowrap",
            backgroundColor:
              row.status === 1 ? "rgba(63, 195, 128, 0.9)":row.status === 2?"#9C9C9C" : "red",
            color: "white",
            cursor: row.status === "active" ? "pointer" : "default",
          }}
        >
          {row.status === 1 ? "Active":row.status === 2 ? "Pending" : "Inactive"}
        </div>
      ),
    },
  ];
  const getList = async () => {
    try {
      setSkelitonLoading(true);

      const response = await getDashboardTableData(page, pageSize);
      if (response) {
        const data = response?.data?.data;
        setData(data || []);
        setSkelitonLoading(false);
        setTotalRows(response?.data?.data?.total || 0);
        setFrom(response?.data?.data?.from || 0);
        setTo(response?.data?.data?.to || 0);
        setPage(response.data.current_page);
        setTotalPage(response.data.last_page);
      }
    } catch (error: any) {
      toast.error(error?.message);
      setSkelitonLoading(false);
    } finally {
      setSkelitonLoading(false);
    }
  };
  useEffect(() => {
    getList();
  }, [page, pageSize]);
  const mappedData =
    data &&
    data?.map((item: any, index: any) => {
      return {
        index: index + 1,
        user_id: item?.aft_detail?.user_id,
        customer_type_name: item?.customer_type_name=="saudi"?"Citizen":item?.customer_type_name=="non-saudi"?"Resident":"Visitor" ,
        email: item?.email || "-",
        mobile_no: item?.mobile_no || "-",

        status: item?.status || "-",
        created_at: item?.created_at || "-",
        customer_id: item?.customer_id || "-",
      };
    });
  console.log(data, "data");

  return (
    <div>
      <div className="header-label mt-2 mb-4">Last 10 Onboarded Customers</div>
      <TableView
        header={Activity_Loans_Header}
        data={mappedData}
        totalRows={totalRows}
        isLoading={skelitonLoading}
        from={from}
        totalPage={totalPage}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        to={to}
        pagination={false}
      />
    </div>
  );
};

export default RecentsLabels;
