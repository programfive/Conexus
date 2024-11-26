import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { addUserToDatabase } from "@/service/userService";

async function ChatPage() {
  const { userId } = await auth();
  
  const response = await clerkClient;
  console.log(response);

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
  return <div className="animate-out">hola mundo</div>;
}
export default ChatPage;
