import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// ___________________Context________________________
import { StoryContextProvider } from "./Context/CounterContext";
// ___________________Redux________________________
import { Provider } from "react-redux";
import STORY from "./Redux/STORY/STORY";
// ___________________Query________________________
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
// ___________________________________________

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/*Redux */}
    <Provider store={STORY}>
      {/* Context */}
      <StoryContextProvider>
        {/* Query */}
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </QueryClientProvider>
      </StoryContextProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
