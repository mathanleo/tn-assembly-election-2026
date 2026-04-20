function buildOurTeamCard() {
    console.log("hiiiiii", ourteam);

    const ourTeamContainer = document.getElementById("ourteam-members-container");
    if (!ourTeamContainer) {
        console.error('Our Team container not found');
        return;
    }

    ourTeamContainer.innerHTML = `
    ${ourteam.map(member => `
        <div class="member">
            <div class="member-image">
                <img src="${member.profileImage}" alt="${member.name}" onerror="this.onerror=null; this.src='../assets/images/our-team/placeholder.jpg'">
            </div>
            <div class="member-detail">
                <h3>${member.name}</h3>
                <div class="social">
                    ${member.socialprofile.map(profile => `
                            ${profile.instagram ? `<a href="${profile.instagram}" target="_blank" aria-label="Instagram"><img src="../assets/images/our-team/socialprofiles/instagram.svg" alt="Instagram"></a>` : ''}
                            ${profile.github ? `<a href="${profile.github}" target="_blank" aria-label="GitHub"><img src="../assets/images/our-team/socialprofiles/github.svg" alt="GitHub"></a>` : ''}
                            ${profile.linkedin ? `<a href="${profile.linkedin}" target="_blank" aria-label="LinkedIn"><img src="../assets/images/our-team/socialprofiles/linkedin.svg" alt="LinkedIn"></a>` : ''}
                            ${profile.x ? `<a href="${profile.x}" target="_blank" aria-label="X"><img src="../assets/images/our-team/socialprofiles/twitter.svg" alt="X"></a>` : ''}
                            ${profile.gmail ? `<a href="mailto:${profile.gmail}" target="_blank" aria-label="Email"><img src="../assets/images/our-team/socialprofiles/gmail.svg" alt="Email"></a>` : ''}
                            ${profile.facebook ? `<a href="${profile.facebook}" target="_blank" aria-label="Facebook"><img src="../assets/images/our-team/socialprofiles/facebook.svg" alt="Facebook"></a>` : ''}
                        `).join('')}
                        </div>
            </div>
        </div>
    `).join('')}
    `

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildOurTeamCard);
} else {
    buildOurTeamCard();
}

// `<div class="member">
//             <div class="member-image">
//                 <img src="../assets/images/our-team/placeholder.jpg" alt="placeholder" onerror="this.onerror=null; this.src='../assets/images/our-team/placeholder.jpg'">
//             </div>
//             <div class="member-detail">
//                 <h3>And Many More</h3>
//             </div>
//         </div>`