
export async function register(user) {

    const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário.");
    }

    return await response.json();
}

export async function login(user){
    const response = await fetch("http://localhost:8080/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },  
            body: JSON.stringify(user) 
        });
        
        if(!response.ok){
            throw new Error("Login incorreto.");
        }
        return await response.json();
}