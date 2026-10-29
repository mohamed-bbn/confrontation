   $(document).ready(function() {
       let originalTeam = null;

       $(".team-list").sortable({
           connectWith: ".team-list",
           placeholder: "ui-sortable-placeholder",
           cursor: "grabbing",
           revert: 150,
           start: function(event, ui) {
               originalTeam = ui.item.parent();
           },
           stop: function(event, ui) {
               let targetTeam = ui.item.parent();
               let playerName = ui.item.attr("data-player-name");
               let newTeamName = targetTeam.attr("data-team-name");

               updatePlayerStyle(ui.item, targetTeam.attr("id"));

               updateCounts();

               if (originalTeam && originalTeam.attr("id") !== targetTeam.attr("id")) {
                   let count1 = $("#team-1 .player-card").length;
                   let count2 = $("#team-2 .player-card").length;
                   showToast(`أُقلت ${playerName} في ${newTeamName} ليصبحوا ${count1} ضد ${count2}`);
               }
           }
       }).disableSelection();

       function updateCounts() {
           $(".team-list").each(function() {
               let count = $(this).children(".player-card").length;
               let parentBox = $(this).closest(".team-box");

               parentBox.find(".count-num").text(count);

               if (count === 0) {
                   parentBox.find(".empty-msg").show();
               } else {
                   parentBox.find(".empty-msg").hide();
               }
           });
       }

       function updatePlayerStyle(player, teamId) {
           if (teamId === "team-1") {
               player.removeClass("team-2-theme").addClass("team-1-theme");
           } else {
               player.removeClass("team-1-theme").addClass("team-2-theme");
           }
       }

       function showToast(message) {
           let toast = $("#toast");
           $("#toast-text").text(message);
           toast.addClass("show");

           setTimeout(function() {
               toast.removeClass("show");
           }, 3000);
       }

       $("#randomize-btn").click(function() {
           let allPlayers = $(".player-card").toArray();
           allPlayers.sort(() => Math.random() - 0.5);

           let half = Math.ceil(allPlayers.length / 2);

           $.each(allPlayers, function(index, player) {
               if (index < half) {
                   $("#team-1").append(player);
                   updatePlayerStyle($(player), "team-1");
               } else {
                   $("#team-2").append(player);
                   updatePlayerStyle($(player), "team-2");
               }
           });

           updateCounts();
           showToast("تم توزيع اللاعبين عشوائيًا!");
       });

       updateCounts();
   });