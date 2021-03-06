import { createContext, useState } from "react";

export const UserContext = createContext<any>(null);

const UserProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<any>();
    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
