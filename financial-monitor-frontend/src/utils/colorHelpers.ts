type Status = "Pending" | "Completed" | "Failed";

export const getStatusColor = (status: Status) => {
  switch (status) {
    case "Completed": return "#27ae60";
    case "Failed": return "#e74c3c";
    case "Pending": 
    default: return "#f1c40f";
  }
};