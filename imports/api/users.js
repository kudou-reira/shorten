import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {

		var email = user.emails[0].address;

		var userSchema = new SimpleSchema({
			email: {
				type: String,
				regEx: SimpleSchema.RegEx.Email
			}
		});

		userSchema.validate({email});


		// console.log("this is the user", user);
		return true;
});