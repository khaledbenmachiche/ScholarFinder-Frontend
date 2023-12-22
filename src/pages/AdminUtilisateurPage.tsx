import Table from "../components/Table";
import AdminSideBar from "../components/AdminSideBar.tsx";

const AdminUtilisateurPage = () => {
    return(
        <div className="flex w-screen h-screen">
            <AdminSideBar/>
            <div className="lg:ml-64 w-full">
                <div className=" w-full flex justify-between items-center mt-12 lg:mt-4 ml-3 mb-4">
                    <button type="button" className=" whitespace-nowrap text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ajouter Utilisateur</button>
                    <div className="w-fit h-fit flex gap-2 mr-6">
                        <button type="button" className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Modifier</button>
                        <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Supprimer</button>
                    </div>
                </div>
                <Table/>
            </div>
        </div>
    )

}
export default AdminUtilisateurPage
