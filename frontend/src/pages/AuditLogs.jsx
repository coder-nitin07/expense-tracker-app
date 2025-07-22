import React, { useEffect, useState } from "react";
import API from "../utils/axios";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get("http://localhost:3000/audit/getAuditLogs");
        setLogs(res.data.logs || []);
      } catch (err) {
        console.error("Failed to fetch audit logs:", err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="text-white space-y-6 pb-10">
      <h2 className="text-2xl font-bold">Audit Logs</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#1E1E1E] rounded-md">
          <thead>
            <tr>
              <th className="text-left px-4 py-2">Action</th>
              <th className="text-left px-4 py-2">Expense</th>
              <th className="text-left px-4 py-2">Performed By</th>
              <th className="text-left px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t border-[#333]">
                <td className="px-4 py-2">{log.action}</td>
                <td className="px-4 py-2">{log.expenseId?.title || "N/A"}</td>
                <td className="px-4 py-2">{log.performedBy?.name || "N/A"}</td>
                <td className="px-4 py-2">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;