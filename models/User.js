const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// hash lösenord
userSchema.pre("save", async function(next) {
    try {
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();

    } catch (error) {
        next(error);
    }
});

// registrera användare
userSchema.statics.register = async function (username, password) {
    try {
        const user = new this({username, password});
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

// jämföra hashade lösenordet
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    }catch {
        throw error;    
    }
}

// logga in användare
userSchema.statics.login = async function(username, password) {
    try {
        const user = await this.findOne({ username });
        if (!user) {
            throw new Error("incorrect username/password");
        }

        const isPasswordMatch = await user.comparePassword(password);

        // Om lösenordet är fel
        if (!isPasswordMatch) {
            throw new Error("Incorrect username/password");
        }

        // Korrekt lösenord
        return user;
    } catch {
        throw error;
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;