import { redirect } from "react-router-dom";
import { deleteItem } from "../Helpers/helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
  //delete the user
  deleteItem({ key: "userName" });
  deleteItem({ key: "budgets" });
  deleteItem({ key: "expenses" });
  toast.success("You've deleted your account");

  //return redirect
  return redirect("/");
}