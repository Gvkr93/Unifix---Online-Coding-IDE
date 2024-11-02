import {createContext, useContext, useState, useEffect} from "react";
import {v4} from 'uuid'

//return a react component and this react component takes the prop value and this value will be resolved to all of its children
export const PlaygroundContext = createContext();  

const intialData = [
    {
        id: v4(), //v4 is a func returns uniq id
        title: 'DSA',
        files: [
            {
                id: v4(),
                title: 'index',      
                code: `cout<<"Hello world";`,
                language: 'cpp'
            }
        ]
    },
    {
        id: v4(), //v4 is a func returns uniq id
        title: 'Frontend',
        files: [
            {
                id: v4(),
                title: 'test',      
                code: `cout<<"Hello Frontend";`,
                language: 'javascript'
            }
        ]
    }
];

const defaultCodes = {
    'cpp': `
#include <iostream>
using namespace std;
int main() {
    cout<<"Hello World";
    return 0;
}`,
    'javascript': `console.log("Hello Javascript")`,
    'python': `print("Hello Python")`,
    'java': `
public class Main {
	public static void main(String[] args) {
		System.out.println("Hello World");
	}
}`
}
export const PlaygroundProvider = ({children}) => {
    //to make our folders permanent when user changes it
    const [folders, setFolders] = useState(() => {
        const localData = localStorage.getItem('data');
        if (localData) {
            return JSON.parse(localData);
        }
        return intialData;
    });

    const createNewPlayground = (newPlayground) => {
        const {fileName, folderName, language} = newPlayground;
        const newFolders = [...folders];
        newFolders.push({
            id:v4(),
            title: folderName,
            files: [
                {
                    id: v4(),
                    title: fileName,
                    code: defaultCodes[language],
                    language
                }
            ]
        })
        localStorage.setItem('data', JSON.stringify(newFolders));
        setFolders(newFolders);
    }

    useEffect(() => {
        if(!localStorage.getItem('data')) {
            localStorage.setItem('data', JSON.stringify(folders));
        }
    }, [])

    const playgroundFeatures = {
        folders,
        createNewPlayground
    }

    return (
        <PlaygroundContext.Provider value = {playgroundFeatures}>
            {children}
        </PlaygroundContext.Provider>
    );
}