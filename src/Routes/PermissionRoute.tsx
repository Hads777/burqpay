import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

interface ModulePermissionRouteProps {
  children: JSX.Element;
  requiredModule: string;
  requiredPermission?: string;
}

const ModulePermissionRoute: React.FC<ModulePermissionRouteProps> = ({
  children,
  requiredModule,
  requiredPermission,
}) => {
  const permissionData = useSelector((state: RootState) => state.block.permissions);
console.log(permissionData,"112223333")
  const hasModuleAccess = () => {
    if (!permissionData || !permissionData.modules) return false;

    const module = permissionData.modules.find(
      (mod: any) => mod.name === requiredModule
    );

    if (!module) return false;

    if (!requiredPermission) return true;

    return module.permissions.some(
      (perm: any) => perm.name === requiredPermission
    );
  };

  return hasModuleAccess() ? children : <Navigate to="/unauthorized" replace />;
};

export default ModulePermissionRoute;
