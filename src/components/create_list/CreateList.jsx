import { useState } from "react";
import styles from "./CreateList.module.css";

const CreateList = ({createNewList, setCreatingNew}) => {
    const [listNameInput, setListNameInput] = useState("");

    const handleListAdd = async (e) => {
        e.preventDefault();

        // Sjekk om input er tom eller bare whitespace
        if (listNameInput.trim() === "") {
            return; // Ikke gjør noe hvis tom
        }

        try {
            await createNewList(listNameInput);
            setCreatingNew(false);
        } catch (error){
            throw error;
        }
    };

    return (
        <div className={styles.createList}>
            <h1>Opprett ny liste</h1>
            <form onSubmit={handleListAdd}>
                <label>Listenavn: </label>
                <input
                    placeholder="Skriv listenavn"
                    value={listNameInput}
                    onChange={(e) => {
                        setListNameInput(e.target.value);
                    }}
                />
                <button type="submit">Opprett</button>
                <button type="button" onClick={() => setCreatingNew(false)}>
                    Avbryt
                </button>
            </form>
        </div>
    );
}

export default CreateList;