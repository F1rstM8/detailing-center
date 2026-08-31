export const ORDER_STATUS = {
  NEW: "NEW",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.NEW]: "#ff9800", 
  [ORDER_STATUS.IN_PROGRESS]: "#2196f3", 
  [ORDER_STATUS.COMPLETED]: "#4caf50", 
};


export const ORDER_STATUS_CLASSES = {
  [ORDER_STATUS.NEW]: "status-new",
  [ORDER_STATUS.IN_PROGRESS]: "status-progress",
  [ORDER_STATUS.COMPLETED]: "status-done",
};