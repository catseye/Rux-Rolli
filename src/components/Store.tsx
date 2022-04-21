import * as React from "react";

import { State, SetStateType } from "../state";

export const StoreContext = React.createContext<[State, SetStateType]>(null);
