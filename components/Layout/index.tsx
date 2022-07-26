import { Box, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ReactNode } from "react";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div style={{ backgroundColor: grey[900], minHeight: "100vh" }}>
      <Container sx={{ color: "text.primary" }}>
        <main>
          <Container
            sx={{
              padding: "20px 0",
              bgcolor: "background.default",
            }}
          >
            {children}
          </Container>
        </main>
        <footer></footer>
      </Container>
    </div>
  );
};
export default Layout;
