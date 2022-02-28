import { ScrollView } from "react-native";
import Friend from "./Friend";

interface IListFriendsProps {
  friends: [string, number][];
}

const ListFriends = ({ friends }: IListFriendsProps) => {
  return (
    <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      {friends.map((transaction, idx) => (
        <Friend key={idx} transaction={transaction} />
      ))}
    </ScrollView>
  );
};

export default ListFriends;
