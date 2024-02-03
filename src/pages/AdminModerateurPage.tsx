import ModerateurTable from "../components/ModerateurTable.tsx";
import AdminSideBar from "../components/AdminSideBar.tsx";
import {useState} from "react";
import useAxios from "../hooks/useAxios.ts";
import AjouterModerateurForms from "../components/AjouterModerateurForms.tsx";

const AdminModerateurPage = () => {
    const axios = useAxios();
    const [triggerAjoutPopUp,setTriggerAjoutPopUp] = useState(false);
    const [moderateurToDelete, setModerateurToDelete] = useState<number[]>([]);
    const handleDeleteButtonEvent = () => {
        axios.delete("/moderation/",{data: { moderators_ids: moderateurToDelete}})
            .then(res => {
                if (res.status === 204) {
                    console.log("Moderateur supprimé");
                    window.location.reload();
                }})
            .catch(err => console.log(err));
    }

    const updateSelectedRows = (selectedModertors:number[])=>{
        setModerateurToDelete(selectedModertors);
    }

    const handleCloseAjoutPopUp=()=>{
        setTriggerAjoutPopUp(false);
    };
    
    const handleOpenAjoutPopUp = ()=>{
        setTriggerAjoutPopUp(true);
    }
    return (
        <>
            <AjouterModerateurForms trigger={triggerAjoutPopUp} handleCloseAjoutPopUp={handleCloseAjoutPopUp} />
            <div className="flex w-screen h-screen overflow-hidden">
                <AdminSideBar/>
                <div className="w-full md:ml-64 lg:ml-64">
                    <div className="flex items-center  justify-between w-full mt-12 mb-4 px-8 lg:mt-4 md:px-4 lg:px-[31px]">
                        <button type="button"
                                className=" whitespace-nowrap text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={handleOpenAjoutPopUp}
                                >
                        Ajouter Moderateur
                        </button>
                        <button type="button"
                                onClick={handleDeleteButtonEvent}
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Supprimer
                        </button>
                    </div>
                    <ModerateurTable updateSelectedRows={updateSelectedRows} />
                </div>
            </div>
        </>
    )

}
export default AdminModerateurPage
  
 