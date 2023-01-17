import React from "react";

import { OptionList } from "../OptionList";
import { OptionButton } from "../OptionList/OptionButton";

import { Form } from "../Form";
import { ViewUsers } from "./ViewUsers";
import { SearchUser } from "./SearchUser";
import { AddUser } from "./AddUser";
import { ModifyUser } from "./ModifyUser";
import { DeleteUser } from "./DeleteUser";

import './UserWindow.css';

function UserWindow() {

    const [viewActive, setViewActive] = React.useState(true);
    const [searchActive, setSearchActive] = React.useState(false);
    const [addActive, setAddActive] = React.useState(false);
    const [modifyActive, setModifyActive] = React.useState(false);
    const [deletective, setDeleteActive] = React.useState(false);

    function setInactive() {
        setViewActive(false);
        setSearchActive(false);
        setAddActive(false);
        setModifyActive(false);
        setDeleteActive(false);
    }

    return (
        <section className="UserWindow">
            <h1 className="windowTitle">USUARIOS</h1>
            <OptionList>
                <OptionButton textButton='Ver usuarios' active={viewActive} setActive={setViewActive} setInactive={setInactive}/>
                <OptionButton textButton='Buscar usuario' active={searchActive} setActive={setSearchActive} setInactive={setInactive}/>
                <OptionButton textButton='Agregar usuario' active={addActive} setActive={setAddActive} setInactive={setInactive}/>
                <OptionButton textButton='Modificar usuario' active={modifyActive} setActive={setModifyActive} setInactive={setInactive}/>
                <OptionButton textButton='Eliminar usuario' active={deletective} setActive={setDeleteActive} setInactive={setInactive}/>
            </OptionList>
            <Form>
                {viewActive && <ViewUsers/>}
                {searchActive && <SearchUser/>}
                {addActive && <AddUser/>}
                {modifyActive && <ModifyUser/>}
                {deletective && <DeleteUser/>}
            </Form>
        </section>
    )
}

export { UserWindow };