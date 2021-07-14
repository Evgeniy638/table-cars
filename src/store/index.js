import { createStore } from "redux";
import { reducers } from "./reducers";
import { selectors } from "./selectors";
import { typeActions } from "./types";
import { actionCreators } from "./action-creators";

export const store = createStore(reducers);
export { selectors }
export { typeActions }
export { actionCreators }
