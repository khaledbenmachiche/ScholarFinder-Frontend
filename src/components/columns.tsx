
interface MyData {
    last_name: string;
    first_name: string;
    email: string;
    user_name: string;
  }

  export const COLUMNS = [
    {
      Header: "Nom",
      accessor: "last_name" as keyof MyData,
    },
    {
      Header: "Prenom",
      accessor: "first_name" as keyof MyData,
    },
    {
      Header: "Email",
      accessor: "email" as keyof MyData,
    },
    {
      Header: "Nom d'utilisateur",
      accessor: "user_name" as keyof MyData,
    },
  ];
  
  