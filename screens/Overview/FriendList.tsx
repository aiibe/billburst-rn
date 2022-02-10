import { ScrollView } from "react-native";
import { IGroupTransaction } from "../../helpers";
import Friend from "./Friend";

interface IFriendListProps {
  transactions: IGroupTransaction[];
}

const FriendList = ({ transactions }: IFriendListProps) => {
  return (
    <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      {transactions.map((transaction, idx) => (
        <Friend key={idx} transaction={transaction} />
      ))}
    </ScrollView>
  );
};

export default FriendList;
