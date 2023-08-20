import { useEffect, useState } from "react";

export const useUsers = () => {
  const [data, setData] = useState<Root | null>(null);
  const [state, setState] = useState<"success" | "error" | "loading">(
    "loading"
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://dummyjson.com/users?limit=10");

        if (res.status !== 200) {
          setState("error");
          return;
        }

        // this timeout is used for loading showcase
        setTimeout(async () => {
          const responseData = await res.json();
          setData(responseData);
          console.log("Data saved successfully");
          setState("success");
        }, 1000);
      } catch (error) {
        setState("error");
      }
    })();
  }, []);

  return {
    // removing first user, it will be main profile
    usersData: { ...data, users: data?.users.filter((user) => user.id !== 1) } as Root,
    profileData: data?.users[0],
    usersState: state,
  };
};

export interface Root {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  email: string;
  image: string;
  university: string;
}
