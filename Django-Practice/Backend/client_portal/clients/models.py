from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.
class Client(models.Model):
    COMPANY_SIZES = [ ('startup', 'Startup (1-10 employees)'),
                    ('small', 'Small (11-50 employees)'),
                    ('medium', 'Medium (51-200 employees)'),
                    ('large', 'Large (201+ employees)')
                    ]
    name = models.CharField(max_length=200, help_text="client's name or company name")
    email = models.EmailField(unique=True, help_text="client's email address")
    phone = models.CharField(max_length=15, blank=True, help_text="client's phone number")
    company = models.CharField(max_length=200, blank=True, help_text="client's company name if diff from name")
    company_size = models.CharField(max_length=20, choices=COMPANY_SIZES, default='startup', help_text="size of client's company")
    industry = models.CharField(max_length=200, blank=True, help_text="industry of client's company")
    website = models.URLField(blank=True, help_text="client's company website")
    
    # company address
    address_line1 = models.CharField(max_length=200, blank=True)
    address_line2 = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=200, blank=True, help_text='client\'s city', default="Faisalabad")
    state = models.CharField(max_length=200, blank=True, help_text='client\'s state or province', default="Punjab")
    zip_code = models.CharField(max_length=20, blank=True, help_text='client\'s postal code', default="38000")
    country = models.CharField(max_length=200, blank=True, help_text='client\'s country', default="Pakistan")

    # Foreign Key Relation
    account_manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='managed_clients', help_text="User who manages this client")
    # using that managed_clients related name, we could do: user.managed_clients.all() to get all clients managed by a user
    
    annual_revenue = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True, help_text="client's annual revenue in PKR")

    # metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True, help_text="Is this client currently active?")

    # additional notes
    notes = models.TextField(blank=True, help_text="Additional notes about the client")
    priority_level = models.IntegerField(default=3,
                                        validators=[MinValueValidator(1), MaxValueValidator(5)],
                                        help_text="Priority level of the client (1-5)")

    # the Meta class is used to define additional options for the model
    class Meta:
        ordering = ['-created_at']  # default ordering by created_at
        # what is that - before created_at? it means descending order, so the most recent clients will be listed first
        verbose_name = "Client"
        verbose_name_plural = "Clients"
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['company']),
            models.Index(fields=['created_at']),
            models.Index(fields=['is_active']),
        ]

    def __str__(self):
        return f"{self.name} ({self.company})" if self.company else self.name
    @property
    def get_full_address(self):
        parts = [
            self.address_line1,
            self.address_line2,
            f"{self.city}, {self.state} {self.zip_code}".strip(),
            self.country
        ]
        return ', '.join(filter(None, parts))
    # def get_absolute_url(self):
    #     return reverse('client_detail', kwargs={'pk': self.pk})

