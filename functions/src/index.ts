import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

import * as sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = functions.config().sendgrid.key

sgMail.setApiKey(SENDGRID_API_KEY);

sgMail.setSubstitutionWrappers('{{', '}}');

admin.initializeApp();

const db  = admin.firestore()

const settings = { timestampsInSnapshots: true };

db.settings(settings);

export const newLessonEmailNotifications = functions.firestore 
    .document('lesson/{lessonId}')
    .onCreate(async (snapshot, context) => {

        const data          = snapshot.data();

        return sendMail(data)
});

function sendMail(data) {
    const title         = data.title;
    const discription   = data.discription;

    const action =  db.collection('users')
             .get()
             .then((querySnapshot) => { 
                 querySnapshot
                 .forEach((eachDoc) => {
                     const message = {
                        from                    : 'info@teamishare.com',
                        to                      : eachDoc.data().email,
                        subject                 : 'New Lesson added',
                        templateId              : 'ebbcffee-61aa-436f-8d56-55ee5751ce49',
                        substitutionWrappers    : ['{{', '}}'],
                        substitutions           : {
                            title               : title,
                            discription         : discription,
                            id                  : eachDoc.id,
                        }
                    };
                    return sgMail.send(message)
                    .then(() => console.log('email sent!') )
                    .catch(err => console.log(err) )
                })
        })

    return action
}
