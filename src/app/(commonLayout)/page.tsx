import { userService } from "@/services/user.service";
import { cookies } from "next/headers";

export default async function Home() {
  const { data, error } = await userService.getSession();
  console.log(data);
  

  return <div>fd</div>;
}
