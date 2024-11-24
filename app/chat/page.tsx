import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { addUserToDatabase } from "@/service/userService";
async function ChatPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const user = await currentUser();
  if (userId && user) {
    const fullName = user.firstName + " " + user.lastName || "";
    const email = user.emailAddresses[0]?.emailAddress || "";
    const image = user.imageUrl || "";
    await addUserToDatabase(userId, fullName, email, image);
  }
  return <div>hola mundo</div>;
}
export default ChatPage;
