import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Header from './components/Header'
import Home from './components/Home'


const App = () => {
    return(
        <>
        <Header />

        <div>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
            </Routes>
        </div>
        </>
    )
    
}

export default App;