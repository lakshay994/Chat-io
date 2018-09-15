class Users {
    constructor(){
        this.users = [];
    }

    addUser(id, name, room){
        let user = {
            id,
            name,
            room
        }
        this.users.push(user);
        return user;
    }

    removeUser(id){
        let user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user) => {
                return user.id !== id;
            });
        }
        return user;
    }

    getUser(id){
        let user = this.users.filter((user) => {
            return user.id === id;
        });
        return user[0];
    }

    getUserList(room){
        let users = this.users.filter((user) => {
            return user.room === room;
        });
        let names = users.map((user) => {
            return user.name;
        })

        return names;
    }
}

module.exports = {
    Users
};