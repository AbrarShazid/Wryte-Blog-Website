import { Navbar1 } from "@/components/layoutComponents/Navbar1";

export default function CommonLayout({children}:{children:React.ReactNode}) {
  return (
    <div>
         <Navbar1></Navbar1>
         {children}
    </div>
  )
}
