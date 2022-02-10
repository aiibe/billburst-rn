import { ParamListBase } from "@react-navigation/native";

export interface RootStackParamsList extends ParamListBase {
  Overview: undefined;
  Friend: { name: string };
}
