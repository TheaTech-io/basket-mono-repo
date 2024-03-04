import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../../redux/store";
import Cart from "../../components/Cart/Cart";
import { Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = (): JSX.Element => {
  const [, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);
  const cart = useAppSelector((state) => state.dashboardSlice.cart);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCartOpen = (event: React.MouseEvent<any>) => {
    setAnchorElCart(event?.currentTarget);
  };

  const handleCartClose = () => {
    setAnchorElCart(null);
  };

  const cartOpen = Boolean(anchorElCart);
  const cartId = cartOpen ? "simple-popover" : undefined;

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        background: "white",
        color: "black",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
            }}
            onClick={() => navigate("/")}
          >
            BookHub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon
                sx={{
                  p: 0,
                  mr: 0.5,
                  ml: 0.5,
                  color: "black",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              fontSize: 22,
            }}
            onClick={() => navigate("/")}
          >
            BH
          </Typography>
          <Badge
            sx={{ p: 0, mr: 0.5, ml: 0.5 }}
            badgeContent={
              cart
                ? cart.reduce((total, item) => {
                    return total + item.quantity;
                  }, 0)
                : 0
            }
            color="error"
          >
            <Avatar
              sx={{ background: "yellow", color: "black", cursor: "pointer" }}
            >
              <ShoppingCartIcon
                aria-describedby={cartId}
                onClick={(e) => handleCartOpen(e)}
              />
              <Cart
                open={cartOpen}
                handleClose={handleCartClose}
                anchorEl={anchorElCart}
                cart={cart}
              />
            </Avatar>
          </Badge>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
