$(function() {
    $("#user-search").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: "http://localhost:3000/api/users",
                dataType: "json",
                success: function(data) {
                    var filteredData = $.map(data, function(user) {
                        if (user.name.toLowerCase().indexOf(request.term.toLowerCase()) !== -1) {
                            return {
                                label: user.name,
                                value: user.name,
                                id: user._id 
                            };
                        }
                        return null;
                    });
                    response(filteredData);
                }
            });
        },
        minLength: 1, 
        select: function(event, ui) {
            $.ajax({
                url: `http://localhost:3000/api/users/${ui.item.id}`,
                dataType: "json",
                success: function(user) {
                    $("#user-details").html(
                        `<h2>User Details</h2>
                        <p><strong>Name:</strong> ${user.name}</p>
                        <p><strong>Age:</strong> ${user.age}</p>`
                    );
                }
            });
        }
    });
});
