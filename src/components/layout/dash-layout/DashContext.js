import { createContext } from "react";

const DashContext = createContext({
  dashboards: [],
  current: {},
  isSuccess: false,
  index: 0,
  setIndex: () => {},
});

export default DashContext;