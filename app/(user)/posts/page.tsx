import getCurrentUser from "@/app/actions/getCurrentUser";

const page = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <h1>{currentUser?.email}</h1>
    </>
  )
}

export default page