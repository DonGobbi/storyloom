import { Scene, Character } from '../types';

export const characters: Character[] = [
  {
    id: 'amina',
    name: 'Amina',
    avatar: 'amina.png'
  },
  {
    id: 'mother',
    name: 'Mother',
    avatar: 'mother.png'
  },
  {
    id: 'father',
    name: 'Father',
    avatar: 'father.png'
  },
  {
    id: 'stranger',
    name: 'Stranger',
    avatar: 'stranger.png'
  },
  {
    id: 'campLeader',
    name: 'Camp Director',
    avatar: 'camp-leader.png'
  },
  {
    id: 'unOfficer',
    name: 'UN Officer',
    avatar: 'un-officer.png'
  },
  {
    id: 'australianOfficer',
    name: 'Australian Immigration Officer',
    avatar: 'australian-officer.png'
  }
];

export const scenes: Scene[] = [
  // Act 1: The Departure from Congo
  {
    id: 'start',
    background: 'congo_village.jpg',
    character: 'amina',
    text: "Eastern Congo, 2018 - The sounds of gunfire echo in the distance as conflict between armed groups intensifies near our village.",
    dialogueText: "We can't stay here much longer. The fighting is getting closer every day.",
    choices: [
      {
        text: 'Stay one more night to prepare',
        nextSceneId: 'stay'
      },
      {
        text: 'Leave immediately',
        nextSceneId: 'flee'
      }
    ]
  },
  {
    id: 'stay',
    background: 'congo_night.jpg',
    character: 'father',
    text: "The family gathers their most important belongings and documents in preparation for the journey ahead.",
    dialogueText: "We'll leave at dawn. Pack only what you can carry for a long journey. We're heading south, toward Malawi.",
    nextSceneId: 'stay_consequences'
  },
  {
    id: 'stay_consequences',
    background: 'congo_night.jpg',
    text: "That night, the sounds of conflict grow much closer. Gunfire and explosions wake you from sleep.",
    character: 'mother',
    dialogueText: "Amina, we must leave now! They've entered the village!",
    nextSceneId: 'forced_departure'
  },
  {
    id: 'forced_departure',
    background: 'congo_escape.jpg',
    text: "Your family flees into the forest with only what you could grab. In the chaos, you become separated from your father. Your mother pulls you forward, promising he'll find his way to Malawi too.",
    nextSceneId: 'journey_hardship'
  },
  {
    id: 'flee',
    background: 'congo_day.jpg',
    character: 'amina',
    text: "Without waiting another moment, you alert your family to leave immediately.",
    dialogueText: "We need to go now. I can hear them coming closer.",
    nextSceneId: 'flee_preparation'
  },
  {
    id: 'flee_preparation',
    background: 'congo_escape.jpg',
    text: "Your family grabs what few possessions and documents they can and slips away from the village just as armed men appear on the horizon. Your quick decision may have saved your lives.",
    nextSceneId: 'journey'
  },
  
  // Act 2: The Journey to Malawi
  {
    id: 'journey',
    background: 'border_crossing.jpg',
    text: "The journey south is treacherous. You and your mother travel for weeks, crossing through dangerous territories and navigating unfamiliar borders.",
    character: 'amina',
    dialogueText: "How much further to Malawi, mother? My feet are so sore I can barely walk.",
    choices: [
      {
        text: 'Join a group of refugees heading to Malawi',
        nextSceneId: 'trust_stranger'
      },
      {
        text: 'Continue with just your mother',
        nextSceneId: 'go_alone'
      }
    ]
  },
  {
    id: 'journey_hardship',
    background: 'forest_path.jpg',
    text: "The hasty departure means you left without proper supplies or a clear route. You and your mother navigate by asking locals and following rumors of safe passages to Malawi.",
    character: 'mother',
    dialogueText: "Stay close, Amina. We'll make it to Dzaleka camp. I've heard they accept Congolese refugees there.",
    nextSceneId: 'journey'
  },
  {
    id: 'trust_stranger',
    background: 'refugee_group.jpg',
    text: "You join a group of Congolese refugees who are also heading to Dzaleka camp in Malawi. There's safety in numbers.",
    character: 'amina',
    dialogueText: "Thank you for letting us join you. We've been traveling alone for weeks.",
    nextSceneId: 'stranger_help'
  },
  {
    id: 'stranger_help',
    background: 'malawi_border.jpg',
    character: 'stranger',
    dialogueText: "I fled Congo three months ago. The Malawian authorities will register us at the border, then direct us to Dzaleka. It's crowded but safer than what we left behind.",
    nextSceneId: 'camp_arrival_with_guide'
  },
  {
    id: 'go_alone',
    background: 'rural_path.jpg',
    text: "You and your mother decide to continue alone, taking less-traveled paths to avoid potential dangers.",
    character: 'amina',
    dialogueText: "We can trust only each other now. I'll help you carry our things, mother.",
    nextSceneId: 'alone_challenges'
  },
  {
    id: 'alone_challenges',
    background: 'malawi_border.jpg',
    text: "After nearly a month of travel, you reach the Malawian border. You're exhausted, hungry, and your clothes are tattered, but you've made it this far.",
    character: 'mother',
    dialogueText: "We need to tell the border officials we're seeking asylum. Remember what your father said - we must keep our documents safe.",
    nextSceneId: 'camp_arrival_alone'
  },
  
  // Act 3: Life in Dzaleka Refugee Camp, Malawi
  {
    id: 'camp_arrival_with_guide',
    background: 'dzaleka_entrance.jpg',
    text: "With the help of your fellow refugees, you and your mother are registered at Dzaleka Refugee Camp in Malawi. The camp houses over 40,000 refugees, mostly from Congo, Burundi, and Rwanda.",
    character: 'unOfficer',
    dialogueText: "Welcome to Dzaleka. You'll be assigned temporary shelter and receive a ration card. The registration process will continue over the next few days.",
    nextSceneId: 'camp_introduction'
  },
  {
    id: 'camp_arrival_alone',
    background: 'dzaleka_entrance.jpg',
    text: "After being processed at the border, you and your mother are transported to Dzaleka Refugee Camp. You arrive exhausted but relieved to have reached relative safety.",
    character: 'unOfficer',
    dialogueText: "You'll start with emergency housing. The camp is crowded - over 40,000 people in a space designed for 10,000 - but you're safe from the conflict in Congo.",
    nextSceneId: 'camp_introduction'
  },
  {
    id: 'camp_introduction',
    background: 'dzaleka_overview.jpg',
    character: 'campLeader',
    dialogueText: "Dzaleka was established in 1994 and many residents have been here for years or even decades. We have schools, health clinics, and community centers, but resources are limited.",
    nextSceneId: 'camp_life'
  },
  {
    id: 'camp_life',
    background: 'dzaleka_daily.jpg',
    text: "Six months pass. You and your mother establish a routine in the camp. Your father hasn't arrived, and with each passing day, hope dims. You must decide how to build a life here.",
    character: 'amina',
    dialogueText: "We can't just wait forever. I need to think about the future, even if it's not the one we planned.",
    choices: [
      {
        text: 'Focus on education',
        nextSceneId: 'join_community'
      },
      {
        text: 'Help your mother with small business',
        nextSceneId: 'find_work'
      }
    ]
  },
  {
    id: 'join_community',
    background: 'dzaleka_school.jpg',
    text: "You enroll in the camp's secondary school, determined to continue your education despite the circumstances. Your academic performance stands out among your peers.",
    character: 'amina',
    dialogueText: "Education is the one thing no one can take from me. Even in this camp, I can prepare for a better future.",
    nextSceneId: 'education_opportunity'
  },
  {
    id: 'find_work',
    background: 'dzaleka_market.jpg',
    text: "You help your mother establish a small tailoring business in the camp market. With your help managing customers and finances, the business slowly grows.",
    character: 'amina',
    dialogueText: "We need to be self-sufficient. The food rations aren't enough, and we can save something for our future.",
    nextSceneId: 'work_connections'
  },
  
  // Act 4: Resettlement Opportunity to Australia
  {
    id: 'education_opportunity',
    background: 'dzaleka_office.jpg',
    text: "After three years in Dzaleka, your academic achievements catch the attention of a special scholarship program for refugees. A UNHCR officer calls you for a meeting.",
    character: 'unOfficer',
    dialogueText: "Amina, your teachers have recommended you for a scholarship program that includes potential resettlement to Australia. They're looking for promising young refugees who can contribute to their society.",
    nextSceneId: 'resettlement_choice'
  },
  {
    id: 'work_connections',
    background: 'dzaleka_community.jpg',
    text: "Your business acumen and leadership in the camp's market committee impresses the camp administration. After three years in Dzaleka, you're called to a meeting with UNHCR officials.",
    character: 'unOfficer',
    dialogueText: "Australia has a special humanitarian program for refugees with demonstrated entrepreneurial skills. Your name has been put forward as a candidate for resettlement.",
    nextSceneId: 'leadership_choice'
  },
  {
    id: 'resettlement_choice',
    background: 'dzaleka_family.jpg',
    text: "The possibility of resettlement to Australia presents a life-changing opportunity, but also a difficult choice.",
    character: 'amina',
    dialogueText: "Australia... it's so far away. What about mother? What if father finally finds us here and we're gone?",
    choices: [
      {
        text: 'Apply for Australian resettlement',
        nextSceneId: 'accept_resettlement'
      },
      {
        text: 'Stay in Dzaleka with your mother',
        nextSceneId: 'stay_with_family'
      }
    ]
  },
  {
    id: 'leadership_choice',
    background: 'dzaleka_meeting.jpg',
    text: "The camp director also offers you a position coordinating vocational training programs within Dzaleka, recognizing your leadership abilities.",
    character: 'amina',
    dialogueText: "I could help many people here in the camp... but Australia would offer opportunities I can't even imagine.",
    choices: [
      {
        text: 'Accept the camp leadership position',
        nextSceneId: 'accept_leadership'
      },
      {
        text: 'Pursue Australian resettlement',
        nextSceneId: 'seek_elsewhere'
      }
    ]
  },
  
  // Endings
  {
    id: 'accept_resettlement',
    background: 'australia_interview.jpg',
    text: "You begin the lengthy Australian resettlement process. Over the next year, you attend multiple interviews, health screenings, and cultural orientation sessions.",
    character: 'australianOfficer',
    dialogueText: "Your application has been approved. Once you arrive in Australia, you'll receive support for housing, education, and integration for your first year.",
    nextSceneId: 'australia_journey'
  },
  {
    id: 'australia_journey',
    background: 'airplane.jpg',
    text: "The day finally arrives. With tearful goodbyes to your mother, who encourages you to seize this opportunity, you board a plane to Australia.",
    character: 'amina',
    dialogueText: "I promise I'll establish myself and find a way to bring you to Australia too, mother. This isn't goodbye forever.",
    nextSceneId: 'ending_education'
  },
  {
    id: 'stay_with_family',
    background: 'dzaleka_home.jpg',
    text: "You decide to remain in Dzaleka with your mother, focusing on building the best life possible within the constraints of the camp.",
    character: 'amina',
    dialogueText: "We'll find our new beginning together. I couldn't leave you alone, especially if there's still hope father might find us.",
    nextSceneId: 'ending_family'
  },
  {
    id: 'accept_leadership',
    background: 'dzaleka_leader.jpg',
    text: "You accept the leadership position in Dzaleka's vocational training program, becoming an important figure in the camp community.",
    character: 'amina',
    dialogueText: "This camp gave us shelter when we needed it most. Now I can help others build skills for whatever future awaits them.",
    nextSceneId: 'ending_leadership'
  },
  {
    id: 'seek_elsewhere',
    background: 'australia_application.jpg',
    text: "You decide to pursue the Australian resettlement opportunity, beginning the extensive application and interview process.",
    character: 'amina',
    dialogueText: "Mother, I'll go first and establish myself. Then I'll do everything possible to sponsor you to join me in Australia.",
    nextSceneId: 'australia_journey'
  },
  {
    id: 'ending_education',
    background: 'australia_university.jpg',
    text: "Two years later in Australia, you're thriving in your university studies in Sydney. You've started the process to sponsor your mother's resettlement. Your experience as a Congolese refugee shapes your determination to study international development.",
    character: 'amina',
    dialogueText: "Every video call with mother reminds me why I'm here. Australia has given me opportunities I never imagined possible in Dzaleka. Soon, we'll be together again."
  },
  {
    id: 'ending_family',
    background: 'dzaleka_improved.jpg',
    text: "The years pass in Dzaleka, and though life in the camp remains challenging, you find purpose. You become a teacher in the camp school, helping a new generation of refugee children maintain hope.",
    character: 'amina',
    dialogueText: "Home isn't always a place. Sometimes it's the people who stand by you through the hardest times. We've built something meaningful here, despite everything."
  },
  {
    id: 'ending_leadership',
    background: 'dzaleka_ceremony.jpg',
    text: "Under your leadership, Dzaleka's vocational program flourishes. Many refugees find purpose and skills that help them either rebuild lives in the camp or prepare for opportunities elsewhere. Your work attracts international attention and funding.",
    character: 'amina',
    dialogueText: "When I first arrived from Congo, I felt powerless. Now I see how much difference one person's actions can make, even in a refugee camp."
  },
  {
    id: 'ending_journey',
    background: 'australia_city.jpg',
    text: "After months of applications and interviews, you relocate to Melbourne, Australia. You balance university studies with part-time work, building a new life while never forgetting your Congolese roots and your time in Dzaleka.",
    character: 'amina',
    dialogueText: "From Congo to Malawi to Australia - my journey continues, but now I choose the path. That makes all the difference. And soon, mother will join me here."
  }
];

export const initialState = {
  currentSceneId: 'start',
  visitedScenes: [],
  emotionalState: 0,
  relationships: {
    'stranger': 0,
    'campLeader': 0,
    'mother': 5
  }
};
