import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHandsClapping, FaNewspaper, FaTableList } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function NavbarDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Bienvenida",
      path: "/dashboard/welcome",
      icon: FaHandsClapping,
    },
    {
      name: "Formulario",
      path: "/dashboard/form-add-products",
      icon: FaNewspaper,
    },
    {
      name: "Tabla",
      path: "/dashboard/table",
      icon: FaTableList,
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">MENÚ</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="primary"
            href="#"
            variant="flat"
            onClick={() => navigate("/")}
          >
            Cerrar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color="primary" className="w-full" to={item.path} size="lg">
              <div
                className="flex flex-row items-center"
                style={{ gap: "10px" }}
              >
                <item.icon />
                {item.name}
              </div>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarDashboard;
