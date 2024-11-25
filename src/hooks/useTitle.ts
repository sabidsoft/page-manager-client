import { useEffect } from "react";

const useTitle = (title: string): void => {
    useEffect(() => {
        if (title === "Home") {
            document.title = `Page Management System`;
        } else {
            document.title = `${title} | Page Management System`;
        }
    }, [title]);
};

export default useTitle;