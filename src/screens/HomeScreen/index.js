import { useContext } from "react";
import { Modal } from "../../Providers/Modals/Modal";
import "./index.scss"
import { RightComponent } from "./RightComponent";
import { ModalContext } from "../../Providers/ModalProvider";

export const HomeScreen = () => {
    const modalFeatures = useContext(ModalContext); 
    //can use entire object

    const openCreatePlaygroundModal = () => {
        modalFeatures.openModal("CREATE_PLAYGROUND");
    };
    return (
        <div className="home-container">
            <div className="left-container">
                <div className="items-container">
                    <img src="logo.png" />
                    <h1>Online Code Editor</h1>
                    <h2>Code.Compile.Debug</h2>
                    <button onClick={openCreatePlaygroundModal}>
                        <span className="material-icons">add</span>
                        <span> Create Playground</span>
                    </button>
                </div>
            </div>
            <RightComponent />
            <Modal />
        </div>
    );
}