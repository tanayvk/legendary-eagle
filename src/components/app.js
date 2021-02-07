import React from "react";
import ReactDom from "react-dom";
import Content from "./content";
import arr from "./objects";
import Obj from "./objects";
import Header from "./header";
import Footer from "./login1";

function App(){
    return ( <div>
                < Header />
                {Obj.map(newContent => (

                    < Content name = {newContent.name} rollno = {newContent.roll} />
                )
                    
                    
                    )}
                < Footer />    
            </div>
            );
}

export default App;