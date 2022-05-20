import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import {StyledHeader} from "../Component/Styled/StyledHeader";



export default function RouterBasic() {
    return (
        <BrowserRouter>
            <div>
                    <Routes>
                        <Route path="/"/>
                        <Route path="header" element={<StyledHeader/>}/>

                    </Routes>

            </div>
        </BrowserRouter>

                )
        }