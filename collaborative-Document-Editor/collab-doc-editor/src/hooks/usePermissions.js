import { useState } from 'react';

const usePermissions = () => {
    const [permissions, setPermissions] = useState({
        canView: true,
        canEdit: false,
    });

    const toggleEditAccess = () => {
        setPermissions((prev) => ({
            ...prev,
            canEdit: !prev.canEdit,
        }));
    };

    const updatePermissions = (newPermissions) => {
        setPermissions((prev) => ({
            ...prev,
            ...newPermissions,
        }));
    };

    return {
        permissions,
        toggleEditAccess,
        updatePermissions,
    };
};

export default usePermissions;